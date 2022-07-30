import axios from "axios";

const store = axios.create({
    baseURL:"https://factory-0-cikupahmet-dev.apps.sandbox.x8i5.p1.openshiftapps.com/api/factory"
});

export default store;