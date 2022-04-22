import { toast } from 'react-toastify';
export const notify = (text,type) => {
    switch (type) {
        case 'success':
           return toast.success(text);

        case 'warn':
            return toast.warn(text);
        default :
            return toast.warn("مشکلی به وجود آمده است");
    }
}

