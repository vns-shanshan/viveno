import axios from "axios";
import { axiosConfig } from "./axios.base";

export const publicAxios = axios.create(axiosConfig);
