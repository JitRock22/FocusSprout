
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/utils/timerUtils";
import { toast } from "sonner";

interface UserNameFormProps {
  onNameSubmit: (name: string) => void;
  userName: string;
}

const UserNameForm: React.FC<UserNameFormProps> = ({ onNameSubmit, userName }) => {
  const [name, setName] = useState(userName);
  const [isEditing, setIsEditing] = useState(!userName);
  const greeting = getGreeting();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
      setIsEditing(false);
      toast.success("Name saved successfully!");
    }
  };

  if (!isEditing && userName) {
    return (
      <div className="text-white text-center mb-4">
        <h2 className="text-2xl font-semibold">
          {greeting}, <span className="font-bold">{userName}</span>!
        </h2>
        <button 
          onClick={() => setIsEditing(true)} 
          className="text-sm text-white/70 hover:text-white underline mt-1"
        >
          Change name
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-xs mx-auto">
      <div className="text-center mb-2 text-white">
        <label htmlFor="userName" className="block text-lg font-medium mb-1">
          What's your name?
        </label>
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          id="userName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/50"
          autoFocus
        />
        <Button 
          type="submit"
          className="bg-white text-black hover:bg-gray-100"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserNameForm;
