"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { count ,asc,desc, sql, ne } from 'drizzle-orm';
import { user } from "@/drizzle/db/schema";

export const getUsers = async (props : QueryPorps) => {
    const {limit= 12,orderBy ='asc',page =1} = props;
    const offset = (page - 1) * limit;
    const totalUsersResult  = await db.select({count: count() }).from(user);
    const result = await db.select({
        id : user.id ,
        username : user.name,
        image : user.image,
        email:user.email,
        role : user.role
    }).from(user).where(ne(user.role,'admin')).orderBy(orderBy == 'asc' ? asc(user.createdAt) : desc(user.createdAt)).offset(offset).limit(limit)
    const totalUsers = totalUsersResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalUsers;
    return {
        totalUsers : totalUsers ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalUsers / limit),
    }
}

export async function getUserCountsByMonth() {
    // Query to group users by month name and year, and count users
    const totalUsersResult  = await db.select({count: count() }).from(user);
    const totalUsers = totalUsersResult[0].count;

    const usersData = await db
      .select({
        month: sql`TO_CHAR(${user.createdAt}, 'Month')`.as("month") ,
        year: sql`EXTRACT(YEAR FROM ${user.createdAt})`.as("year"),
        count: sql`COUNT(*)`.as("count"),
      })
      .from(user)
      .groupBy(sql`TO_CHAR(${user.createdAt}, 'Month'), EXTRACT(YEAR FROM ${user.createdAt})`)
      .orderBy(sql`EXTRACT(YEAR FROM ${user.createdAt}), TO_CHAR(${user.createdAt}, 'Month')`);
  
    return {
        totalUsersResult : totalUsers ,
        usersData : usersData
    };
  }