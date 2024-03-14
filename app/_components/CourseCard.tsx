import Image from './base/Image';
import { ICourseInfo } from '_services';
import Button from './base/Button';

const CourseCard = ({course, onViewCourse}: {course: ICourseInfo, onViewCourse: any}) => {
  return (
    <div className='w-[350px] rounded-t-md'>
      <div className='w-full h-[350px] rounded-t-md'>
        <Image src={course.coverImage} className='w-full h-full rounded-t-md bg-center'/>
      </div>
      <div className='bg-apple-gray p-6 rounded-b-xl h-[200px]'>
        <div className='space-y-8 flex flex-col justify-between h-full'>
          <div className='space-y-4'>
            <div className='text-2xl'>
              {course.title}
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex gap-2 flex-col'>
                <div>
                  <div className='text-sm text-some-gray flex flex-col justify-center'>
                    {course.location}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-some-gray justify-self-end'>
                    <span>
                      {course.dateAndTime}
                    </span>
                  </div> 
                </div>
              </div>
              <div className='flex justify-end'>
                <Button underline caption='View Course' onClick={onViewCourse}/>
              </div> 
            </div>       
        </div>
      </div>
    </div>
  </div>
  )
}

export default CourseCard