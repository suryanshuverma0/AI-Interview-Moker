"use client"
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs'
// import { desc, eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'
// import InterviewitemCard from './interviewiteamcard';

// function InterviewList() {
//   const {user}=useUser();
//   const [interviewList,setInterviewList]=useState([]);
//   useEffect(()=>{
//     user&&GetInterviewList();
//   },[user])

//   const GetInterviewList = async()=>{
//     const result= await db.select().from(MockInterview).where(eq(MockInterview.createdBy,user?.primaryEmailAddress.emailAddress)).orderBy(desc(MockInterview.id));

//     console.log(result);
//     setInterviewList(result);
//   }
//   return (
  
//     <div>
//       <h2 className='font-medium text-xl '>
//         Previous Mock Interview:
//       </h2>
//       <div  className='grid frid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3 gap-5'>
//         {interviewList&&interviewList.map((interview,index)=>(
//           <InterviewitemCard 
//           interview={interview}
//           key={index}/>
//         ))}
//       </div>
//     </div>
//   )
// }
// export default InterviewList

import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewitemCard from './interviewiteamcard';


function InterviewList() {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState([])

  useEffect(() => {
    user && GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(MockInterview.id))

    setInterviewList(result)
  }

  const deleteInterview = async (mockId) => {
    try {
      // Deleting interview from the database
      await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId))

      // Removing the deleted interview from the state
      setInterviewList(interviewList.filter(interview => interview.mockId !== mockId))

      console.log("Interview deleted successfully")
    } catch (error) {
      console.error("Error deleting interview", error)
    }
  }

  return (
    <div>
      <h2 className='font-medium text-xl'>
        Previous Mock Interview:
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3 gap-5'>
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewitemCard
              key={index}
              interview={interview}
              onDelete={deleteInterview}
            />
          ))}
      </div>
    </div>
  )
}

export default InterviewList
