import React, { useEffect, useState } from 'react'

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://vendor-store-server.vercel.app/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    setIsSeller(data.isSeller);
                    setIsSellerLoading(false);
                })
                .catch(err => console.log(err))
        }
    }, [email]);

    return [isSeller, isSellerLoading]
}

export default useSeller
