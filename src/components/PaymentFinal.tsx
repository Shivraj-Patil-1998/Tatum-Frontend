"use client"
import { Box, Container, LinearProgress } from "@mui/material";
import { Fragment, useEffect, useState, type FC } from "react";
import { useForm, Controller } from 'react-hook-form';
import Image, { StaticImageData } from 'next/image';
import { PiWarningBold } from "react-icons/pi";
import Copy from "../assets/copy.svg";
import Barcode from "../assets/barcode.svg";
import ExchangeInputOne from "./ExchangeInput1";
import { useRouter } from 'next/router';
import { getAllAssets, getGasAddress } from "@/Api/CreateWallet";

interface Props {

}
const PaymentFinal: FC<Props> = ({
}) => {

    const { control, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const { assetId, email, amount, assetName } = router.query;
    const [createAddress, setCreatedAddress] = useState<string>('');
    const [progress, setProgress] = useState(100);
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/payment');
                    return 0;
                }
                return prev - 1;
            });

            setProgress((prevProgress) => (prevProgress - 100 / 120));
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         getOperationType();
    //     },1000)
    // }, [router.query])

    // const getOperationType = async () => {
    //     const data = { chain: assetName };
    //     if (assetName === "BTC") {
    //         console.log("btc trigger");
    //         const [res] = await getAllAssets(data);
    //         if (res !== null) {
    //             setValue('btc_pay', res.body?.address);
    //             setCreatedAddress(res.body?.address)
    //         }
    //     } else {
    //         if (assetName === "Ethereum") {
    //             const eth = 'ETH';
    //             const dataEth = { chain: eth ? eth : assetName, from: 0, to: 0 };
    //             const [res] = await getGasAddress(dataEth);
    //             if (res !== null) {
    //                 setValue('btc_pay', res.body[0]);
    //                 setCreatedAddress(res.body[0]);
    //             }
    //         }
    //     }
    // };

    const handleCopy = async (value: string | any) => {
        try {
            await navigator.clipboard.writeText(value);
        } catch (error) {
            console.error("Error copying:", error);
        }
    };

    return (
        <Container className="flex flex-col gap-2 rounded bg-white py-12 px-24 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.25)] w-8/12">
            <div className="my-4 text-start text-base font-semibold pb-10`">
                <form className="">
                    <div className="flex">
                        <div className="flex-[2 2 50%]">
                            <div className="mx-auto max-w-xll space-y-4 font-semibold">
                                Payment status :
                                <span className="text-[#2CA455]">Active</span>
                            </div>
                            <div className="mx-auto max-w-xll space-y-3 font-bold text-2xl pt-7 pb-2">
                                First Name
                            </div>
                            <div className="mx-auto max-w-xll space-y-3 font-semibold text-base text-[#676767]">
                                Created April 23, 2024 1:46 PM
                            </div>
                            <div className="flex mx-auto max-w-xll gap-12 font-normal text-base py-5">
                                <span className="font-bold">Description</span>
                                <span className="text-sm">Lorem ipsum dolor sit amet consectetur.</span>
                            </div>
                            <div className="flex mx-auto max-w-xll gap-16 font-semibold text-base pt-7 pb-4">
                                <span className="font-bold">Amount</span>
                                <span className="px-3">1000 USDT</span>
                            </div>
                        </div>
                        <div className="flex-[1 1 0%]">
                            <Image
                                className="cursor-pointer pt-7"
                                src={Barcode as StaticImageData}
                                alt="Copy"
                            />
                        </div>
                    </div>



                    <span className="line-space-payment"></span>
                    <Box className="w-full py-5">
                        <p className="mb-2 font-normal text-sm">Expires in {Math.floor(timeLeft / 60)} min {timeLeft % 60} sec</p>
                        <LinearProgress
                            variant="determinate"
                            sx={{
                                height: 10,
                                borderRadius: 10,
                                border: 1,
                                borderColor: "#BABABA",
                                backgroundColor: "white",
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: "#C2912E", // Custom color for the progress bar
                                }
                            }}
                            value={progress}
                        />
                    </Box>
                    <div className="flex flex-col gap-2 rounded-2xl bg-stone-100 py-7 px-7 my-4">
                        <div className="flex gap-3 text-[#C2912E]">
                            <PiWarningBold className="text-3xl" />
                            <span>Pay Attention to</span>
                        </div>
                        <div>
                            <ul className="list-disc pl-8 font-normal py-2 text-[#676767]">
                                <li>Sending any other currency will result in loss of funds.</li>
                                <li>If the wallet you are using charges a fee that reduces the total amount that is sent, please send enough to cover it.</li>
                            </ul>
                        </div>
                    </div>
                    <span className="line-space-payment"></span>
                    <div className="py-4">
                        <div className="font-normal text-sm">Amount to Pay</div>
                        {/* <div className="flex font-bold text-2xl gap-3">{amount} {assetName}
                            <span> <Image
                                onClick={() => handleCopy(amount)}
                                className="cursor-pointer pt-1"
                                src={Copy as StaticImageData}
                                alt="Copy"
                            /></span>
                        </div> */}
                    </div>
                    <div className="relative w-full">
                        <ExchangeInputOne
                            control={control}
                            label="BTC address to pay"
                            name="btc_pay"
                            type="text"
                            placeholder="BTC address to pay"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 " >
                            <Image
                                onClick={() => handleCopy(createAddress)}
                                className="cursor-pointer pt-7"
                                src={Copy as StaticImageData}
                                alt="Copy"
                            />
                        </span>
                    </div>

                </form>
            </div>
        </Container>
    );
};

export default PaymentFinal;
