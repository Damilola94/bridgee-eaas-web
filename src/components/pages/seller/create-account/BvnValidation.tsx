
import TextInput from "../../../inputs/Text";

// interface Props {
//   formData: StepData;
//   setFormData: (data: StepData) => void;
// }

interface Props {
  formData: StepData;
  setFormData: (data: StepData) => void;
}

export default function BvnValidation() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4">
        {/* <label htmlFor="bvn" className="block text-sm font-medium text-gray-700 mb-1">BVN Validation</label>
        <Input
          id="bvn"
          type="text"
          placeholder="Input your BVN"
          value={formData.bvn}
          onChange={(e) => setFormData({ ...formData, bvn: e.target.value })}
          className="w-full h-12"
        /> */}

        <TextInput
          className="w-full mb-3"
          //   value={bvn}
          //   onChange={handleBvnChange}
          type="text"
          label="BVN Validation"
          name="password"
          maxValue={11}
          //   disabled={bvnMutation.isLoading}
          placeholder="Enter your 11-digit BVN"
        />
      </div>
      <p className="text-sm font-medium text-grey">
        Your BVN is required to validate your details. To get your BVN dial
        *565*0# on your registered number.
      </p>
    </form>
  );
}
