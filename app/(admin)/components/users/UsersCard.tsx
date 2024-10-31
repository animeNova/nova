import React from 'react'
import { getUserCountsByMonth } from '../../actions/users/user.action'
import InfoCard from '../info/InfoCard'
import { User } from 'lucide-react'

const UsersCard =async () => {
    const users =await getUserCountsByMonth()
   
    
  return (
    <>
    <InfoCard title='Total Users' icon={<User size={20} />} linkTo='/admin/users' description='this is the users growth' totalCount={users.totalUsersResult} data={users.usersData}  />

    </>
  )
}

export default UsersCard
