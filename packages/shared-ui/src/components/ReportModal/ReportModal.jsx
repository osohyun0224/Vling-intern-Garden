import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./ReportModal.module.scss";
import ChannelHeader from "@bzznbyd/temp-channel-header";
import ReportTitleGroup from "../organisms/ReportTitleGroup/ReportTitleGroup";
import RecentVideoStat from "../RecentVideoStat/RecentVideoStat";
import RecentAdVideoStat from "../RecentAdVideoStat/RecentAdVideoStat";
import ViewerStat from "../ViewerStat/ViewerStat";
import RevenueAnalysis from "../RevenueAnalysis/RevenueAnalysis";
import AdvertisingPrice from "../AdvertisingPrice/AdvertisingPrice";
import ExtraInputForm from "../ExtraInputForm/ExtraInputForm";
import SuggestAdCost from "../SuggestAdCost/SuggestAdCost";
import ProposeAdButton from "../atoms/ModalButton/ProposeAdButton";
import SavePdfButton from "../atoms/ModalButton/SavePdfButton";

const ReportModal = ({ show, onClose }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [adType, setAdType] = useState("");
  const [contact, setContact] = useState("");

  const handleAdTypeSelection = (type) => {
    setAdType(type);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  useEffect(() => {
    if (show) {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`; // 년-월-일 형식으로 날짜 형식화
      setCurrentDate(formattedDate);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [show]);

  const savePdf = async () => {
    const images = document
      .getElementById("modalContent")
      .getElementsByTagName("img");

    const convertImageToBase64 = (imgElement) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = () => reject(new Error("Image load error"));
        img.src = imgElement.src;
        if (img.complete || img.complete === undefined) {
          img.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = imgElement.src;
        }
      });
    };

    const convertAllImages = async () => {
      for (let img of images) {
        try {
          const base64 = await convertImageToBase64(img);
          img.src = base64;
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      }
    };

    await convertAllImages();
    html2canvas(document.getElementById("modalContent"), {
      windowHeight: document.getElementById("modalContent").scrollHeight,
      windowWidth: document.getElementById("modalContent").scrollWidth,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("vling_channel_report.pdf");
    });
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        id="modalContent"
      >
        <div className={styles.header}>
          <div className={styles.title}>광고 제안서</div>
          <img
            src={"/images/png/Close.png"}
            alt="Close"
            className={styles.closeButton}
            onClick={onClose}
          />
        </div>
        <hr className={styles.divider} />
        <ReportTitleGroup currentDate={currentDate} />
        <ChannelHeader />
        <div className={styles.videotitle}>채널 영상 분석</div>
        <div className={styles.videoStatsContainer}>
          <RecentVideoStat />
          <RecentAdVideoStat />
        </div>
        <div className={styles.viewertitle}>시청자 및 수익 분석</div>
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
        <div className={styles.endtext}>Vling 채널 레포트 end.</div>
        <hr className={styles.divider} />
        <br />
        <br />
        <div className={styles.viewertitle}>추가 전달 사항</div>
        <div className={styles.videoStatsContainer}>
          <ExtraInputForm />
        </div>
        <div className={styles.groupContainer}>
          <div className={styles.group}>
            <div className={styles.youtubertitle}>최소 광고 비용 제안</div>
            <SuggestAdCost />
          </div>
          <div className={styles.group}>
            <div className={styles.youtubertitle}>광고 진행 유형</div>
            <div className={styles.adTypeSelection}>
              <button
                className={`${styles.adTypeButton} ${adType === "normal" ? styles.selected : ""}`}
                onClick={() => handleAdTypeSelection("normal")}
              >
                일반
              </button>
              <button
                className={`${styles.adTypeButton} ${adType === "shorts" ? styles.selected : ""}`}
                onClick={() => handleAdTypeSelection("shorts")}
              >
                Shorts
              </button>
            </div>
          </div>
          <div className={styles.linegroup}>
            <div className={styles.youtubertitle}>연락 수단</div>
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
        <SavePdfButton onClick={savePdf} />
        <ProposeAdButton />
      </div>
    </div>
  );
};

export default ReportModal;
