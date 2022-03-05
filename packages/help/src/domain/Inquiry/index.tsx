import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import useInquiry, { PAGE_STATUS } from './useInquiry';
import NoticeComplete from './NoticeComplete';
import InputForm from './InputForm';

const Inquiry: React.FC = () => {
  const { inquiryState, sendInquiry } = useInquiry();

  return (
    <LayoutH2u options={globalConfig}>
      {inquiryState.pageStatus === PAGE_STATUS.INIT && <div />}
      {inquiryState.pageStatus === PAGE_STATUS.INPUT && (
        <InputForm inquiryState={inquiryState} sendInquiry={sendInquiry} />
      )}
      {inquiryState.pageStatus === PAGE_STATUS.COMPLETE && <NoticeComplete />}
    </LayoutH2u>
  );
};

export default Inquiry;
