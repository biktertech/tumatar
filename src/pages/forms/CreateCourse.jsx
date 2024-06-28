import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { advancedTable} from "../../constant/table-data";
const CreateCourse = () => {
  const errorMessage = {
    message: "This is invalid state",
  };
  const [value, setValue] = useState("");

  const handleFormatter = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-[80%]">
        <Card title="Create Course">
          <div className="space-y-3">
            <Textinput
              label="Course Title*"
              id="pn"
              type="text"
              placeholder="Enter course title"
            />
            <Textarea
              label="Course description*"
              id="pn4"
              placeholder="Enter course description"
            />
            <Textinput
              label="Course Link*"
              id="pn5"
              type="text"
              placeholder=" Enter link i.e https://example.com"
            />
            {/* submit button at the end of the row */}
            <div className="flex justify-end">
              <button className="btn btn-dark">Create</button>
              </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateCourse;
