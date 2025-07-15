import React, { useState } from "react";
import {
Dialog,
DialogTrigger,
DialogContent,
DialogHeader,
DialogTitle,
DialogFooter,
DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import axios from "../../Utils/axios.js";
import { toast } from "sonner";
import { CUSTOMER_API_END_POINT } from "@/Utils/constant";

const UpdateProfileDialog = ({ user, onProfileUpdate }) => {
const [firstName, setFirstName] = useState(user?.firstName || "");
const [lastName, setLastName] = useState(user?.lastName || "");
const [phone, setPhone] = useState(user?.phone || "");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleUpdate = async () => {
setLoading(true);
try {
const res = await axiosInstance.post(
`${CUSTOMER_API_END_POINT}/updateprofile`,
{
firstName,
lastName,
phone,
password: password.trim() !== "" ? password : undefined,
},
{
withCredentials: true,
}
);

 
  if (res.data.success) {
    toast.success("Profile updated successfully");
    onProfileUpdate(); // refresh parent component (e.g. refetch user)
  } else {
    toast.error("Failed to update profile");
  }
} catch (err) {
  toast.error(err.response?.data?.message || "Something went wrong");
} finally {
  setLoading(false);
}
};

return (
<Dialog>
<DialogTrigger asChild>
<Button size="icon" variant="outline" className="rounded-full">
<Pencil className="w-4 h-4" />
</Button>
</DialogTrigger>

 
  <DialogContent className="sm:max-w-sm">
    <DialogHeader>
      <DialogTitle>Update Profile</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <Input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        type="password"
        placeholder="New Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <DialogFooter className="mt-4">
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Save Changes"}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
);
};

export default UpdateProfileDialog;