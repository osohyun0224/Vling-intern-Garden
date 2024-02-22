import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './AdvertisingPrice.module.scss';
import { getChannel } from '../../../../shared-gql/channel/channel.gpl';

const AdvertisingPrice = () => {
    const channelId = "UCZ3dxObRPEJzoryEyQqmhWg";

    return(
        <div className={styles.AdvertisingPrice}>

        </div>
    )
}

export default AdvertisingPrice;