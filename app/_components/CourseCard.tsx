import { CourseSummary } from '_types/Course';
import Image from './base/Image';
import Avatar from './base/Avatar';

const CourseCard = ({course}: {course: CourseSummary}) => {

  const lecturerFullName = `${course?.lecturer?.firstName} ${course?.lecturer?.lastName}`

  return (
    <div className='w-[350px] rounded-t-xl'>
      <div className='w-full h-[443px]'>
        <Image src={course.image} className='w-full h-full'/>
      </div>
      <div className='bg-apple-gray p-6 rounded-b-xl h-[200px]'>
        <div className='space-y-8 flex flex-col justify-between h-full'>
          <div className='space-y-4'>
            <div className='text-2xl'>
              {course.title}
            </div>
            <div className='flex gap-6'>
              <div className='flex gap-4'>
                  <div>
                      <Avatar src={course?.lecturer?.avatar as string}/>
                  </div>
                  <div>
                      <span className='text-md'>
                          {lecturerFullName}
                      </span>
                  </div>
              </div>
              <div className='text-sm text-some-gray flex flex-col justify-center'>
                {course.location}
              </div>
            </div>
          </div>
          <div className='space-y-1 text-sm text-some-gray justify-self-end'>
            <div>
              {course.date.display}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard