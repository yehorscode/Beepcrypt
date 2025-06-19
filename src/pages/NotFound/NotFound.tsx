import { Button } from "@/components/ui/button"

export default function NotFound() {
    function goback() {
        window.location.href = "/"
    }
    return (
        <div className="justify-center mt-50">
            <h1 className="text-8xl font-asset">404</h1>
            <br />
            <h2 className="text-2xl">Whoopsie! Looks like there has been an issue with this page :(((</h2>
            <h2 className="opacity-40">Our unpaid intern couldn't find it!</h2>
            <br />
            <Button onClick={goback}>Go back home</Button>
        </div>
    )
}