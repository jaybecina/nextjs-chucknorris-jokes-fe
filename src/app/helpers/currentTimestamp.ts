import { format } from 'date-fns';

export const getCurrentTimestamp = () => {
    const currentDate = new Date();
    return format(currentDate, 'yyyy-MM-dd HH:mm');
};