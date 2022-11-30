export const getSingleCategory = async (id) => {
    const res = await fetch(`https://vendor-store-server.vercel.app/products/${id}`);
    const data = await res.json();
    return data;
}