import { useDyteMeeting } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";

export const MyMeeting = () => {
  const { meeting } = useDyteMeeting();

  return (
    <div style={{ height: '100vh', width: 'auto' }}>
      <DyteMeeting mode='fill' meeting={meeting} showSetupScreen={false} />
    </div>
  );
};
