import { notification } from 'antd';

const useNotification = () => {

  const openNotification = ({title, content, duration}: {title: string, content: string, duration?: number}) => {
    notification.open({
    duration:duration|| 20000,
      message: title,
      description:
      content,
      placement: 'bottomRight',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  return {
    openNotification
}
  
};

export default useNotification;