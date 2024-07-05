/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '/**'
            }
        ]
    }
};
export default nextConfig;

//PokeAPI/sprites/master/sprites/pokemon/other/dream-world/{id}.svg