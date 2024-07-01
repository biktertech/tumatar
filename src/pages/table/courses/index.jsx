import React, { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import { deleteContent, getContent } from "../../../api/content";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    label: "#",
    field: "id",
  },
  {
    label: "Title",
    field: "content_title",
  },

  {
    label: "Transcript",
    field: "content_transcript",
  },
  {
    label: "Link",
    field: "content_link",
  },
  {
    label: "Action",
    field: "action",
  }
];
// slice(0, 10) is used to limit the number of rows to 10
// const rows = tableData.slice(0, 7);
const courses = () => {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const fetchContent = async () => {
    try {
      const resp = await getContent();
      if (resp.status === 200) {
        setRows(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContentById = async (id) => {
    try {
      const resp = await deleteContent(id);
      if (resp.status === 200) {
        toast.success("Content deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchContent();
      }
    } catch (error) {
      console.log(error);
    }
  
  }

  useEffect(() => { fetchContent(); }, []);
  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
      <Card title="basic table" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{i + 1}</td>
                      <td className="table-td">{row.content_title}</td>
                      {row.content_transcript.length > 50
                        ? row.content_transcript.substring(0, 50) + "..."
                        : row.content_transcript}
                      <td className="table-td ">{row.content_Link}</td>
                      <td className="table-td ">
                        <button onClick={()=>navigate(`/chat/${row.content_id}`)} className="btn btn-dark mx-2">Chat</button>
                        <button onClick={
                          () => deleteContentById(row.content_id)
                        } className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default courses;
