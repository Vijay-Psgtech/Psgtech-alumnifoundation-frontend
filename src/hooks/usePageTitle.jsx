import React, { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | PSG TECH ALUMNI Association`;
  }, [title]);
};

export default usePageTitle;