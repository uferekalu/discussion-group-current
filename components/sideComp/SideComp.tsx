import React, { useState } from "react";
import PulseAnimations from "../animations/PulseAnimations";
import Pagination from "../pagination/Pagination";
import { GroupSlice, RenderItemProps } from "@/utils/interface";

interface ISideComp {
  groups: GroupSlice;
  renderItem: ({ startIndex, endIndex }: RenderItemProps) => React.JSX.Element
}

const SideComp: React.FC<ISideComp> = ({ groups, renderItem }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const totalItems = groups.allGroups.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          backdropFilter: "saturate(180% blur(20px)",
        }}
        className="flex flex-col justify-center items-center p-4 rounded-lg mt-3 mb-3"
      >
        <h3 className="text-sm text-black font-bold">All Groups</h3>
        <p className="text-sm text-black text-center">
          You can look through the below groups and join any group of your
          interest if you are not already a member!!
        </p>
      </div>
      {groups.groupStatus === "pending" && (
        <PulseAnimations num={3} display="grid grid-cols-1 gap-4" />
      )}
      {groups.groupStatus === "rejected" && (
        <div className="text-black text-sm">
          Not Available at the moment. Please refresh the page...
        </div>
      )}
      {groups.groupStatus === "success" && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

export default SideComp;
