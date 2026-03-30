"use client";

import {useState, useTransition} from "react";
import {toast} from "sonner";
import {enrollUser, toggleLectureComplete} from "@/actions/enrollment.action";

import CourseMetaHeader from "./CourseMetaHeader";
import CourseVideoPlayer from "./CourseVideoPlayer";
import CourseInfo from "./CourseInfo";
import CourseSidebarPlaylist from "./CourseSidebarPlaylist";

export default function CourseDetailView({course, initialEnrollment}) {
  // Find the first available lecture to default to if exists
  const firstLecture = course.modules?.[0]?.lectures?.[0] || null;
  const [activeLecture, setActiveLecture] = useState(firstLecture);

  const [enrollment, setEnrollment] = useState(initialEnrollment);
  const [isPending, startTransition] = useTransition();

  const isEnrolled = !!enrollment;
  const completedLectures = enrollment?.completedLectures || [];
  const totalLectures =
    course.modules?.reduce(
      (acc, mod) => acc + (mod.lectures?.length || 0),
      0,
    ) || 0;

  let progressPercentage = 0;
  if (totalLectures > 0) {
    progressPercentage = Math.round(
      (completedLectures.length / totalLectures) * 100,
    );
  }

  const handleEnroll = async () => {
    startTransition(async () => {
      const res = await enrollUser(course._id);
      if (res.success) {
        setEnrollment(res.data);
        toast.success("Successfully enrolled in the course!");
      } else {
        toast.error(res.message || "Failed to enroll");
      }
    });
  };

  const handleLectureClick = (lecture) => {
    setActiveLecture(lecture);
    // Smooth scroll to top on mobile essentially
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleToggleComplete = () => {
    if (!isEnrolled) {
      toast.error("Please enroll in the course first to save progress.");
      return;
    }
    if (!activeLecture) return;

    startTransition(async () => {
      const res = await toggleLectureComplete(course._id, activeLecture._id);
      if (res.success) {
        setEnrollment(res.data);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const isCurrentLectureCompleted = completedLectures.includes(
    activeLecture?._id,
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24">
      <CourseMetaHeader
        course={course}
        activeLecture={activeLecture}
        isEnrolled={isEnrolled}
        isPending={isPending}
        onEnroll={handleEnroll}
      />

      {/* Main Layout Area */}
      <div className="container max-w-[1400px] mx-auto pt-6 lg:pt-8 px-4 lg:px-8 flex-1">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
          {/* Left Column (Video & Content Details) */}
          <div className="flex-1 xl:w-[65%] 2xl:w-[70%] space-y-8">
            <CourseVideoPlayer
              activeLecture={activeLecture}
              isEnrolled={isEnrolled}
              isPending={isPending}
              onEnroll={handleEnroll}
            />

            <CourseInfo
              course={course}
              activeLecture={activeLecture}
              isEnrolled={isEnrolled}
              isPending={isPending}
              isCurrentLectureCompleted={isCurrentLectureCompleted}
              onToggleComplete={handleToggleComplete}
            />
          </div>

          {/* Right Column: Sticky Playlist Sidebar */}
          <div className="xl:w-[35%] 2xl:w-[30%] shrink-0">
            <CourseSidebarPlaylist
              course={course}
              isEnrolled={isEnrolled}
              activeLecture={activeLecture}
              completedLectures={completedLectures}
              progressPercentage={progressPercentage}
              totalLectures={totalLectures}
              onLectureClick={handleLectureClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
