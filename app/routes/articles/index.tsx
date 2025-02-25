import { Navbar } from "~/components/Navbar"
import Table from "./components/Table"
import Forms from "./components/Forms"


const index = () => {
  return (
    <div>
        <Navbar />
        <div className="px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                <div className="">
                    <Forms />
                </div>
                <div className="">
                    <Table />
                </div>
            </div>
        </div>
    </div>
  )
}

export default index