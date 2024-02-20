import React, { useEffect } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import styles from './ReportModal.module.scss'
import ChannelHeader from '@bzznbyd/temp-channel-header'

const ReportModal = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
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
        <div className={styles.reporttitlegroup}>
          <div className={styles.reporttitle}>채널 정보</div>
          <div className={styles.reportdategroup}>
            <div className={styles.reportdatetitle}>제안서 작성 날짜</div>
            <div className={styles.reportdate}>2024-02-24</div>
          </div>
        </div>

        <ChannelHeader />
        <button className={styles.button} onClick={savePdf}>
          pdf로 저장하기
        </button>
      </div>
    </div>
  )
}

export default ReportModal
