"use client";
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
  import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
  

interface InfoCardProps {
    title :string;
    description ?:string;
    totalCount : number;
    icon : React.ReactElement;
    linkTo : string;
    data : {
      month : string | unknown;
      year : string | unknown;
      count : string | unknown;
    }[]
}

const InfoCard : React.FC<InfoCardProps> = ({icon,linkTo,title,totalCount,description,data}) => {
  return (
    <Card className='w-96 space-y-4'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    {title} ({totalCount})
                  </CardTitle>
                {icon}
                </CardHeader>
      
                <CardContent className='space-y-5'>
                <CardDescription>
                  {description}
                </CardDescription>
                <ChartContainer
          config={{
            users: {
              label: "Users",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-[300px] pt-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="count"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "hsl(var(--chart-1))", opacity: 0.8 },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

                </CardContent>
              </Card>
  )
}

export default InfoCard
