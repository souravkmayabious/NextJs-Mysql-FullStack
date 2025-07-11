"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/dashboard/profile", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "failed to fetch");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function Logout() {
    try {
      const res = await axios.get("/api/dashboard/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      //console.log(res.data.message);
      router.push("/auth/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.error(error.response?.data?.message || "Logout failed");
    }
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button onClick={Logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}
