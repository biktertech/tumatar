import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { advancedTable } from "../../constant/table-data";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createContent } from "../../api/content";
import { toast } from "react-toastify";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  transcript: yup.string().required("Transcript is required"),
});

const CreateCourse = () => {
  const errorMessage = {
    message: "This is invalid state",
  };
  const [value, setValue] = useState("");

  const handleFormatter = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });

  const onSubmit = async (data) =>{
    try {
      const resp = await createContent(data);
      if (resp.status === 201) {
        // clear the form
        reset();
        toast.success("Course created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="w-[80%]">
        <Card title="Create Course">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div className="space-y-3">
              <Textinput
                label="Course Title*"
                id="pn"
                name="title"
                type="text"
                placeholder="Enter course title"
                register={register}
              />
              <Textarea
                label="Course description*"
                id="pn4"
                name="transcript"
                register={register}
                placeholder="Enter course description"
              />
              <Textinput
                label="Course Link*"
                id="pn5"
                name="link"
                register={register}
                type="text"
                placeholder=" Enter link i.e https://example.com"
              />
              {/* submit button at the end of the row */}
              <div className="flex justify-end">
                <button className="btn btn-dark">Create</button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateCourse;
