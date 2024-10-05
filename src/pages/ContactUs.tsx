import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import GradientBackground from "../components/GradientBackground";

const ContactUs = () => {
  return (
    <div className="relative">
      <GradientBackground />
      <div className="relative flex flex-col items-center mt-10 container m-auto">
        <h3 className="text-xl">
          We'd love to hear from you! Reach out to us anytime.
        </h3>
        <div className="gap-5 bg-background-100 p-5 w-full mt-10 rounded flex flex-col">
          <div className="w-full">
            <label className="ml-2 text-sm font-bold">Email:</label>
            <Input className="w-full" placeholder="Enter your email here" />
          </div>
          <div className="w-full">
            <label className="ml-2 text-sm font-bold">Message:</label>
            <Textarea
              className="w-full min-h-[300px]"
              placeholder="Enter your message here"
            />
          </div>
          <Button>Submit</Button>
        </div>
        <div className="bg-background-100 p-5 rounded w-full flex flex-col gap-3 mt-10">
          <div>
            <p className="text-lg font-bold">Address</p>
            <p>643 West 30th St, Los Angeles, CA 90007</p>
          </div>
          <div>
            <p className="text-lg font-bold">Email</p>
            <p>contact@luckyvillage.org</p>
          </div>
          <div>
            <p className="text-lg font-bold">Phone</p>
            <p>+1 804 491 9593</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
