'use client';

import React, { createContext, useState, useContext } from 'react';

interface IContextType {
  isShowVariablesAndHeaders: boolean;
  toggleIsShowVariablesAndHeaders: () => void;
  isShowDocs: boolean;
  toggleIsShowDocs: () => void;
  isShowBtnDocs: boolean | null;
  toggleIsShowBtnDocs: (valud: boolean | null) => void;
  isShowUrlApiApplyBtn: boolean;
  toggleisShowUrlApiApplyBtn: (value: boolean) => void;
}

const VisibilityContext = createContext<IContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShowVariablesAndHeaders, setIsShowVariablesAndHeaders] =
    useState<boolean>(true);

  const [isShowDocs, setIsShowDocs] = useState<boolean>(false);

  const [isShowBtnDocs, setIsShowBtnDocs] = useState<boolean | null>(false);

  const [isShowUrlApiApplyBtn, setIsShowUrlApiApplyBtn] =
    useState<boolean>(false);

  const toggleIsShowVariablesAndHeaders = (): void => {
    setIsShowVariablesAndHeaders((prev) => !prev);
  };

  const toggleIsShowDocs = (): void => {
    setIsShowDocs((prev) => !prev);
  };

  const toggleIsShowBtnDocs = (value: boolean | null): void => {
    setIsShowBtnDocs(value);
  };

  const toggleisShowUrlApiApplyBtn = (value: boolean): void => {
    setIsShowUrlApiApplyBtn(value);
  };

  return (
    <VisibilityContext.Provider
      value={{
        isShowVariablesAndHeaders,
        toggleIsShowVariablesAndHeaders,
        isShowDocs,
        toggleIsShowDocs,
        isShowBtnDocs,
        toggleIsShowBtnDocs,
        isShowUrlApiApplyBtn,
        toggleisShowUrlApiApplyBtn,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = (): IContextType => {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};
