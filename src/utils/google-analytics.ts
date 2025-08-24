import ReactGA from "react-ga4";

interface IGAEvent {
  category: string;
  action: string;
  label: string;
}

const initializeGA = () => {
  // Replace with your Measurement ID
  // It ideally comes from an environment variable
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXX");
};

const trackGAEvent = (props: IGAEvent) => {
  const { category, action, label } = props;
  // Send GA4 Event
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default initializeGA;
export { initializeGA, trackGAEvent };