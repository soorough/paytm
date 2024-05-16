import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

const Signup = () => {
  return (
    <div className="h-screen bg-slate-200 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentails to log in"} />
          <InputBox placeholder="John" label={"First Name"} />
          <InputBox placeholder="Doe" label={"Last Name"} />
          <InputBox placeholder="johndoe@gmail.com" label={"Email"} />
          <InputBox placeholder="12345678" label={"Password"} />
          <div className="pt-2">
            <Button label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
