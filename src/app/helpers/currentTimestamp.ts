import moment from 'moment';

export const formatTimestamp = (updated_at: any) => {
    return moment(updated_at).format('YYYY-MM-DD HH:mm');
};