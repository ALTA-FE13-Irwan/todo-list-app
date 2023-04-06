import { FC, useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import { DataType, FormSubmit } from "../utils/user";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import Token from "../utils/Token";

const Detail: FC = () => {
  const [data, setData] = useState<Partial<DataType>>({});
  const [isEdith, setIsEdith] = useState<boolean>(false);
  const [objSubmit, setObjSubmit] = useState<Partial<FormSubmit>>({});

  const Header = {
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
  };

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const { id } = params;
    axios
      .get(`/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setData(data);
        document.title = `${data.content} | Task Management`;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  function handleChange(value: string, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  }

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`/${data.id}`, objSubmit, Header)
      .then(() => {
        Swal.fire("Updated!", "Your file has been updated.", "success").then(
          (result) => {
            if (result.isConfirmed) {
              setObjSubmit({});
              setIsEdith(false);
              fetchData();
            }
          }
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed, update at least 1 ",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => {});
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`/${data.id}`, {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            })
            .then(() => {
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              ).then((result) => {
                if (result.isConfirmed) {
                  navigate("/");
                }
              });
            });
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {});
  };

  const handleEdit = () => {
    setIsEdith(true);
  };

  const backToEdit = () => {
    setIsEdith(false);
  };

  const MyData = () => {
    return (
      <div className="bg-orange-200 py-12 shadow-sm hover:shadow-lg hover:scale-105 duration-700 p-5 md:p-10">
        <div className="grid grid-cols-2">
          <div className="m-1 bg-violet-400  h-11 flex justify-center pt-3 pb-3 md:pt-2 md:pb-2 uppercase mr-5 text-md md:text-xl font-bold text-slate-50">
            Task
          </div>
          <div className="bg-cyan-500 flex  h-24 py-3 px-2 text-md md:text-xl font-semibold text-slate-50">
            {data.content}
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4">
          <div className="m-1 bg-violet-400 h-11 flex justify-center  pt-3 pb-3 md:pt-2 md:pb-2 uppercase mr-5 text-md md:text-xl font-bold text-slate-50">
            Description
          </div>
          <div className="bg-cyan-500 h-20 py-3 px-2 text-md md:text-xl font-semibold text-slate-50">
            {data.description}
          </div>
        </div>
        <div className="mt-10">
          <Button
            label="Edit"
            className="m-1 text-sm rounded-md bg-blue-500  hover:-translate-y-0.5 hover:scale-105 hover:drop-shadow-md duration-300  text-slate-50 uppercase font-bold py-3 px-5  "
            onClick={() => handleEdit()}
          />
          <Button
            label="Delete"
            className="m-1 text-sm rounded-md bg-red-500  hover:-translate-y-0.5 hover:scale-105 hover:drop-shadow-md duration-300  text-slate-50 uppercase font-bold py-3 px-5  "
            onClick={() => handleDelete()}
          />
          <Button
            label="Back to home"
            className="m-1 text-sm rounded-md bg-cyan-500  hover:-translate-y-0.5 hover:scale-105 hover:drop-shadow-md duration-300  text-slate-50 uppercase font-bold py-3 px-5  "
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="h-full p-10 md:p-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {data.id ? (
            MyData()
          ) : (
            <div className="toast toast-center toast-middle">
              <div className="alert alert-info">
                <div>
                  <span>Loading..</span>
                </div>
              </div>
              <div className="alert alert-success">
                <div>
                  <span>Wait a Minute.</span>
                </div>
              </div>
            </div>
          )}
          {isEdith && (
            <div className="bg-orange-200 py-12 shadow-sm hover:shadow-lg hover:scale-105 duration-700 p-5 md:p-10 ">
              <form onSubmit={(event) => handleUpdate(event)}>
                <div className="border-4 p-2 border-teal-400 mb-2 bg-teal-400">
                  <h1 className="text-md md:text-xl font-bold text-slate-700 uppercase mb-2">
                    update TASK
                  </h1>
                  <input
                    id="update-content"
                    type="text"
                    placeholder="content"
                    defaultValue={data.content}
                    className="input input-bordered input-success w-full max-w-xs bg-slate-100 text-teal-950 text-md md:text-xl font-semibold "
                    onChange={(event) =>
                      handleChange(event.target.value, "content")
                    }
                  />
                </div>
                <div className="border-4 p-2 border-orange-400 bg-orange-400">
                  <h1 className="text-md md:text-xl font-bold text-slate-700 uppercase mb-2">
                    update Description
                  </h1>
                  <input
                    id="update-description"
                    type="text"
                    placeholder="description"
                    defaultValue={data.description}
                    className="input input-bordered input-success w-full max-w-xs bg-slate-100 text-teal-950 text-md md:text-xl font-semibold "
                    onChange={(event) =>
                      handleChange(event.target.value, "description")
                    }
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    id="update-task"
                    label="Update"
                    className="mt-3 text-sm rounded-md bg-indigo-600  hover:-translate-y-0.5 hover:scale-105 hover:drop-shadow-md duration-300  text-slate-50 uppercase font-bold py-3 px-5  "
                  />
                  <Button
                    id="cancel"
                    label="Cancel"
                    className="ml-2  text-sm rounded-md bg-fuchsia-400  hover:-translate-y-0.5 hover:scale-105 hover:drop-shadow-md duration-300  text-slate-50 uppercase font-bold py-3 px-5  "
                    onClick={() => backToEdit()}
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
