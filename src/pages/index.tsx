import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Token from "../utils/Token";
import { DataType, FormSubmit } from "../utils/user";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";

const Home: FC = () => {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [objSubmit, setObjSubmit] = useState<FormSubmit>({
    content: "",
    description: "",
  });
  const [myAlert, setMyAlert] = useState<boolean>(true);

  const Header = {
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setDatas(data);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => setMyAlert(false));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("", objSubmit, Header)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Successfully",
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            fetchData();
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => {});
  };

  const handleDelete = (id: any) => {
    axios
      .delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                fetchData();
              }
            });
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => {});
  };

  return (
    <Layout>
      <div className="h-full md:px-10 pb-10">
        <div className=" md:pb-10 pt-10 md:pt-16 px-5 grid grid-cols-1 md:grid-cols-2 justify-center border-none">
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex flex-col align-middle p-5 bg-orange-200 md:h-56 shadow-sm hover:shadow-lg hover:shadow-teal-800 shadow-teal-500 hover:translate-y-0.5 duration-200"
          >
            <input
              id="input-content"
              type="text"
              placeholder="Input Task"
              className="input input-bordered input-success w-full max-w-xs bg-slate-100 text-teal-950 md:text-2xl "
              onChange={(event) =>
                setObjSubmit({ ...objSubmit, content: event.target.value })
              }
            />
            <textarea
              id="input-description"
              className="textarea textarea-success bg-slate-100 my-3 text-teal-950 md:text-2xl"
              placeholder="Description"
              onChange={(event) =>
                setObjSubmit({ ...objSubmit, description: event.target.value })
              }
            />
            <button
              type="submit"
              id="add-task"
              className="btn bg-teal-400 text-slate-700 hover:text-slate-50 font-bold text-lg hover:bg-teal-800"
            >
              Add task
            </button>
          </form>
          <div className="invisible md:visible md:text-end md:text-6xl xl:text-7xl 2xl:text-8xl text-teal-950 antialiased ">
            LET'S REMIND WHAT WE SHOULD DO
          </div>
        </div>
        {!myAlert ? (
          <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 p-5 md:gap-10">
            {datas.map((data) => (
              <Card
                content={data.content}
                description={data.description}
                onClick={() => navigate(`/${data.id}`)}
                onClick2={() => handleDelete(data.id)}
              />
            ))}
          </div>
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
      </div>
    </Layout>
  );
};

export default Home;
