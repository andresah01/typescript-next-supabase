/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: { 
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc'
            }
        ],
        minimumCacheTTL: 1500000
    }
}

module.exports = nextConfig

