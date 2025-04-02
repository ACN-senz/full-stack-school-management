"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: data?.name || "",
      teachers: data?.teachers?.map((teacher: any) => teacher.id) || [],
      ...(data?.id && { id: data.id }),
    },
  });

  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers } = relatedData || { teachers: [] };

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500">Assign Teachers</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {teachers.map((teacher: { id: string; name: string; surname: string }) => (
            <div key={teacher.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`teacher-${teacher.id}`}
                value={teacher.id}
                {...register("teachers")}
                defaultChecked={data?.teachers?.some((t: any) => t.id === teacher.id)}
              />
              <label htmlFor={`teacher-${teacher.id}`} className="text-sm">
                {teacher.name} {teacher.surname}
              </label>
            </div>
          ))}
        </div>
        {errors.teachers?.message && (
          <p className="text-xs text-red-400">
            {errors.teachers.message.toString()}
          </p>
        )}
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;