import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import styles from './ReportModal.module.scss'
import ChannelHeader from '@bzznbyd/temp-channel-header'
import ReportTitleGroup from '../organisms/ReportTitleGroup/ReportTitleGroup'
import RecentVideoStat from '../RecentVideoStat/RecentVideoStat'
import RecentAdVideoStat from '../RecentAdVideoStat/RecentAdVideoStat'
import ViewerStat from '../ViewerStat/ViewerStat'
import RevenueAnalysis from '../RevenueAnalysis/RevenueAnalysis'
import AdvertisingPrice from '../AdvertisingPrice/AdvertisingPrice'
import ExtraInputForm from '../ExtraInputForm/ExtraInputForm'
import SuggestAdCost from '../SuggestAdCost/SuggestAdCost'

const ReportModal = ({ show, onClose }) => {
  const [currentDate, setCurrentDate] = useState('')
  const [adType, setAdType] = useState('')
  const [contact, setContact] = useState('')

  const handleAdTypeSelection = (type) => {
    setAdType(type)
  }

  const handleContactChange = (e) => {
    setContact(e.target.value)
  }

  useEffect(() => {
    if (show) {
      const today = new Date()
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` // 년-월-일 형식으로 날짜 형식화
      setCurrentDate(formattedDate)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [show])

  const savePdf = () => {
    const modalContent = document.getElementById('modalContent')
    html2canvas(modalContent, {
      windowHeight: modalContent.scrollHeight,
      windowWidth: modalContent.scrollWidth,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      const pdf = new jsPDF('p', 'mm')
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save('report.pdf')
    })
  }

  if (!show) {
    return null
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} id="modalContent">
        <div className={styles.header}>
          <div className={styles.title}>광고 제안서</div>
          <img src={'/images/png/Close.png'} alt="Close" className={styles.closeButton} onClick={onClose} />
        </div>
        <hr className={styles.divider} />
        <ReportTitleGroup currentDate={currentDate} />
        <ChannelHeader />
        <div className={styles.videotitle}>채널 영상 분석</div>
        <div className={styles.videoStatsContainer}>
          <RecentVideoStat />
          <RecentAdVideoStat />
        </div>
        <div className={styles.viewertitle}>시청자 분석</div>
        <div className={styles.videoStatsContainer}>
          <ViewerStat />
          <RevenueAnalysis />
        </div>
        <div className={styles.viewertitle}>광고 단가</div>
        <div className={styles.videoStatsContainer}>
          <AdvertisingPrice />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={styles.viewertitle}>추가 전달 사항</div>
        <div className={styles.videoStatsContainer}>
          <ExtraInputForm />
        </div>
        <div className={styles.groupContainer}>
          <div className={styles.group}>
            <div className={styles.viewertitle}>최소 광고 비용 제안</div>
            <SuggestAdCost />
          </div>
          <div className={styles.group}>
            <div className={styles.viewertitle}>광고 진행 유형</div>
            <div className={styles.adTypeSelection}>
              <button onClick={() => handleAdTypeSelection('normal')}>일반 영상</button>
              <button onClick={() => handleAdTypeSelection('shorts')}>Shorts</button>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.viewertitle}>연락 수단</div>
            <div className={styles.contactInput}>
              <input
                type="text"
                placeholder="이메일 혹은 전화번호를 입력하세요"
                value={contact}
                onChange={handleContactChange}
              />
            </div>
          </div>
        </div>
        <button className={styles.button} onClick={savePdf}>
          pdf로 저장하기
        </button>
        <button className={styles.button}>광고 제안하기</button>
      </div>
    </div>
  )
}

export default ReportModal
