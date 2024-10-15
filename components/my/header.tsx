"use client";

import { Users } from "@/types/general";
import { User } from "lucide-react";
import Link from "next/link";
import { LoginBtn } from "./loginbtn";

export default function Header({ data }: { data: Users }) {

    return (
        <nav className=" h-[68px] pl-6 pr-6  py-1 fixed w-full bg-white">
            <div className=" h-full w-full flex items-center justify-between">
                <div className="font-bold">
                    <svg width="80" height="23" viewBox="0 0 125 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.824 22V1.392H15.32V4.752H5.144V10.032H14.136V13.36H5.144V22H0.824ZM20.2063 4.048V0.655998H24.9103V4.048H20.2063ZM20.5583 22V10.032H18.2863L18.6703 6.832H24.8783V22H20.5583ZM30.4765 22V6.832H34.4765L34.6685 8.4C35.3512 7.97333 36.1938 7.58933 37.1965 7.248C38.2205 6.88533 39.2232 6.64 40.2045 6.512V9.776C39.6285 9.86133 38.9992 9.98933 38.3165 10.16C37.6338 10.3307 36.9832 10.5227 36.3645 10.736C35.7458 10.9493 35.2232 11.1733 34.7965 11.408V22H30.4765ZM51.613 22.32C48.989 22.32 46.909 21.6693 45.373 20.368C43.837 19.0453 43.069 17.0507 43.069 14.384C43.069 11.9733 43.709 10.064 44.989 8.656C46.2903 7.22667 48.221 6.512 50.781 6.512C53.1277 6.512 54.9197 7.13067 56.157 8.368C57.4157 9.584 58.045 11.184 58.045 13.168V15.92H47.069C47.3037 17.136 47.8583 17.968 48.733 18.416C49.629 18.864 50.8877 19.088 52.509 19.088C53.3197 19.088 54.141 19.0133 54.973 18.864C55.8263 18.7147 56.5517 18.5227 57.149 18.288V21.36C56.445 21.68 55.6237 21.9147 54.685 22.064C53.7463 22.2347 52.7223 22.32 51.613 22.32ZM47.069 13.264H54.269V12.432C54.269 11.5573 54.013 10.8747 53.501 10.384C52.989 9.872 52.125 9.616 50.909 9.616C49.4797 9.616 48.477 9.904 47.901 10.48C47.3463 11.056 47.069 11.984 47.069 13.264ZM72.552 22.32C69.096 22.32 66.4507 21.392 64.616 19.536C62.7813 17.6587 61.864 15.1093 61.864 11.888C61.864 8.47467 62.7493 5.81867 64.52 3.92C66.312 2.02133 68.9787 1.072 72.52 1.072C73.7573 1.072 74.8667 1.168 75.848 1.36C76.8507 1.53067 77.7893 1.776 78.664 2.096V5.872C76.8507 5.12533 74.9093 4.752 72.84 4.752C70.4933 4.752 68.808 5.33867 67.784 6.512C66.76 7.68533 66.248 9.47733 66.248 11.888C66.248 16.4107 68.4667 18.672 72.904 18.672C73.9067 18.672 74.8987 18.5867 75.88 18.416C76.8613 18.224 77.8 17.9467 78.696 17.584V21.392C77.8213 21.6693 76.8827 21.8933 75.88 22.064C74.8987 22.2347 73.7893 22.32 72.552 22.32ZM83.6115 22V1.392H87.9635L94.0115 13.776L100.059 1.392H104.379V22H100.059V8.592L95.2595 18.448H92.7635L87.9315 8.592V22H83.6115ZM116.338 22.32C115.015 22.32 113.778 22.224 112.626 22.032C111.495 21.84 110.514 21.5627 109.682 21.2V17.392C110.62 17.776 111.634 18.0853 112.722 18.32C113.81 18.5547 114.876 18.672 115.922 18.672C117.415 18.672 118.514 18.5333 119.218 18.256C119.922 17.9787 120.274 17.3493 120.274 16.368C120.274 15.7493 120.124 15.2587 119.826 14.896C119.527 14.5333 119.004 14.2133 118.258 13.936C117.532 13.6373 116.498 13.3067 115.154 12.944C112.999 12.3467 111.484 11.6 110.61 10.704C109.735 9.808 109.298 8.57067 109.298 6.992C109.298 5.09333 109.991 3.632 111.378 2.608C112.764 1.584 114.78 1.072 117.426 1.072C118.663 1.072 119.815 1.15733 120.882 1.328C121.948 1.49867 122.812 1.70133 123.474 1.936V5.744C121.724 5.08267 119.9 4.752 118.002 4.752C116.658 4.752 115.602 4.90133 114.834 5.2C114.066 5.47733 113.682 6.07467 113.682 6.992C113.682 7.52533 113.82 7.952 114.098 8.272C114.375 8.592 114.844 8.88 115.506 9.136C116.188 9.392 117.138 9.68 118.354 10C120.039 10.448 121.34 10.9813 122.258 11.6C123.175 12.2187 123.804 12.9227 124.146 13.712C124.508 14.5013 124.69 15.3867 124.69 16.368C124.69 18.16 124.007 19.6 122.642 20.688C121.276 21.776 119.175 22.32 116.338 22.32Z" fill="#131313" />
                    </svg>
                </div>
                <LoginBtn data={data} />
            </div>
        </nav>
    )
}


