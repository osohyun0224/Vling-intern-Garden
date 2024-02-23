import React from "react";
import styles from './SuggestAdCost.module.scss'

const SuggestAdCost = () => {
    return (
        <div className={styles.suggestAdCost}>
            <input
                type="number"
                placeholder="광고 진행 최소 금액을 입력하세요"
                className={styles.adCostInput}
            />
        </div>
    );
};

export default SuggestAdCost;
