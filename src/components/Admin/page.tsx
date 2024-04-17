import Pages from "../Posts/Posts";

const Admin = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen pt-[50px]">
            <h3 className="w-[80%]">Мэдээ</h3>
            <div className="w-full max-w-[80vw]">
                <Pages />
            </div>
        </div>
    );
}

export default Admin;
