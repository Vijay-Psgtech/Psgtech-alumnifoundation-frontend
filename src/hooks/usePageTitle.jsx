import React, { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | PSG TECH ALUMNI FOUNDATION`;
  }, [title]);
};

export default usePageTitle;