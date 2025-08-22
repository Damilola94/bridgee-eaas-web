// import { Input } from "@/components/ui/input";
import TextInput from "../../../inputs/Text";
// import { StepData } from "@/pages/seller/create-account";

// interface Props {
//   formData: StepData;
//   setFormData: (data: StepData) => void;
// }

export default function PersonalInfo() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   personalInfo: { ...formData.personalInfo, [name]: value },
    // });
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <TextInput label="First Name" name="firstName" placeholder="First Name" value={""} onChange={handleChange} className="" />
        <TextInput label="Last Name" name="lastName" placeholder="Last Name" value={""} onChange={handleChange} className="" />
      </div>
      <TextInput label="Email Address" name="emailAddress" type="email" placeholder="Email Address" value={""} onChange={handleChange} className="" />
      <TextInput label="Phone Number" name="phoneNumber" type="tel" placeholder="Phone Number" value={""} onChange={handleChange} className="" />
      <TextInput label="Business Name" name="businessName" placeholder="Enter Business Name" value={""} onChange={handleChange} className="" />
      <TextInput label="Password" name="password" type="password" placeholder="Enter Password" value={""} onChange={handleChange} className="" />
      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="terms"  />
        <label htmlFor="terms" className="text-sm font-bold text-textColor">I agree to the <a href="/terms" className="text-success">User Agreement</a> and <a href="/privacy" className="text-success">Privacy Policy</a></label>
      </div>
    </div>
  );
}