import { Container } from "@mui/material";
import { Fragment, useEffect, type FC } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import Image from 'next/image';
import ExchangeInput from "./ExchangeInput";
import Link from "next/link";
import MuiButton from "./MuiButton";
import BTC from '../assets/bitcoin.svg';
import Etherium from '../assets/etherium.svg';
import { useRouter } from 'next/router';

interface Props {

}
const Paymenyt: FC<Props> = ({
}) => {

    const filterdAssets = [
        { fireblockAssetId: '1', name: 'BTC', icon: BTC },
        { fireblockAssetId: '2', name: 'Ethereum', icon: Etherium },
    ];

    const { control, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const onSubmit  = (data: any) => {
        const selectedAsset = filterdAssets.find(asset => asset.fireblockAssetId === data.assetId);
        router.push({
            query: { assetId: data.assetId, assetName: selectedAsset?.name, email: data.email, amount: data.amount },
            pathname: '/paymentfinal',
        });
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000)
    };

   
    return (
        <Container className="flex flex-col gap-2 rounded bg-white py-12 px-28 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.25)] w-8/12">
            <div className="my-4 text-start text-base font-semibold">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-auto max-w-xll space-y-4 font-bold ">
                        firstname@testmail.com
                    </div>
                    <div className="mx-auto max-w-xll space-y-3 font-normal text-3xl pt-7 pb-2">
                        First Name
                    </div>
                    <div className="mx-auto max-w-xll space-y-3 font-semibold text-base text-[#676767]">
                        Created April 23, 2024 1:46 PM
                    </div>
                    <div className="mx-auto max-w-xll space-y-3 font-normal text-base py-5">
                        Description
                    </div>
                    <div className="mx-auto max-w-xll space-y-3 font-semibold text-base pt-7 pb-4">
                        Amount
                    </div>
                    <div className="mx-auto max-w-xll space-y-3 font-bold text-3xl text-[#C2912E] pb-5">
                        1000 USDT
                    </div>
                    <span className="line-space"></span>
                    <div className="mx-auto max-w-xll space-y-3 font-semibold text-base text-[#676767] py-5">
                        Select a currency that you  will use for payment
                    </div>
                    <div className="mx-auto max-w-xll space-y-3 font-semibold text-base py-1">
                        Currency
                    </div>

                    <div className="w-10/12">
                        <Controller
                            control={control}
                            name="assetId"
                            rules={{
                                required: 'Please select an asset',
                            }}
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <Fragment>
                                    <Autocomplete
                                        size="small"
                                        options={filterdAssets}
                                        onChange={(_, nextValue) => {
                                            onChange(nextValue?.fireblockAssetId ?? '');
                                            setValue('whitelistId', '');
                                        }}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <li
                                                {...props}
                                                className="flex cursor-pointer items-center gap-2 p-2"
                                            >
                                                <Image
                                                    src={option.icon ?? ''}
                                                    alt={option.name}
                                                    width={30}
                                                    height={30}
                                                />
                                                {option.name}
                                            </li>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                className="flex items-center gap-2 bg-[#ffffff]"
                                                {...params}
                                                placeholder="Select currency"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (() => {
                                                        const assetValue = filterdAssets.find(
                                                            (item) => item.fireblockAssetId === value
                                                        );
                                                        return (
                                                            <Fragment>
                                                                {assetValue && (
                                                                    <Image
                                                                        className="ml-2 h-5 w-4"
                                                                        src={assetValue?.icon ?? ''}
                                                                        alt={assetValue?.name}
                                                                        width={30}
                                                                        height={30}
                                                                    />
                                                                )}
                                                                {params.InputProps.startAdornment}
                                                            </Fragment>
                                                        );
                                                    })(),
                                                }}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                    <p className="text-sm text-red-500">{error?.message}</p>
                                </Fragment>
                            )}
                        />
                    </div>
                    <ExchangeInput
                        control={control}
                        label="Amount"
                        name="amount"
                        type="number"
                        placeholder="Enter Amount"
                        rules={{
                            required: "Amount is required"
                        }}
                    />

                    <div className="mx-auto max-w-xll space-y-3 font-light text-base py-3 ">
                        Make sure the network/standard corresponds to the one in your crypto wallet
                    </div>
                    <span className="line-space"></span>

                    <ExchangeInput
                        control={control}
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="Enter Email"
                        rules={{
                            required: "Email is required",
                            validate: (value: string) => {
                                const emailPattern =
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                                if (!emailPattern.test(value)) {
                                    return "Invalid email address";
                                }
                                return true;
                            },
                        }}
                    />

                    <div className="mx-auto max-w-xll space-y-3 font-light text-base text-[#676767] ">
                        If the payment amount doesn’t match the amount stated above, we’ll send an email on how to recover the funds.
                    </div>

                    <div className="flex items-center gap-2 py-7">
                        <input
                            type="checkbox"
                            value={""}
                            className="mt-[2px] cursor-pointer"
                        />
                        <div className="flex items-center  font-medium text-[#676767]">
                            I agree to the{" "}
                            <div >
                                <span className=" text-sm"> </span>
                                <span
                                    className=" mx-1 cursor-pointer text-sm text-[#C1922E]"
                                >
                                    Terms Of Use
                                </span>
                            </div>
                            <Link
                                target="_blank"
                                href={'/'}
                                className="text-sm font-semibold text-[#C1922E]"
                            >
                                <span className=" mx-1 text-[#676767]">
                                    and
                                </span>
                                Privacy policy
                            </Link>
                        </div>
                    </div>
                    <div className="mx-auto w-fit">
                        <MuiButton
                            name={"Pay"}
                            type="submit"
                            width="200px"

                        />
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default Paymenyt;
