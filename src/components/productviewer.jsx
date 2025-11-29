import useMacbookStore from "./store";
import clsx from "clsx";
import MacbookCanvas from "./MacbookCanvas";

const ProductViewer = () => {
    const { color, setColor, scale, setScale } = useMacbookStore();

    return (
        <section id="productviewer">
            <h2>take a closer look</h2>
            <div className="controls">
                <p className="info">Macbook {scale === 0.08 ? '16"' : '14"'} in {color === '#2e2c2e' ? 'Space Black' : 'Silver'}</p>
                <div className="flex-center gap-5 mt-5">
                    <div className="color-control">
                        <div
                            className={clsx("bg-neutral-300", color === "#c9c8cc" && "active")}
                            onClick={() => setColor('#c9c8cc')}
                        ></div>
                        <div
                            className={clsx("bg-neutral-900", color === "#2e2c2e" && "active")}
                            onClick={() => setColor('#2e2c2e')}
                        ></div>
                    </div>

                    <div className="size-control">
                        <div
                            className={clsx(scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white')}
                            onClick={() => setScale(0.06)}
                        >
                            <p>14"</p>
                        </div>
                        <div
                            className={clsx(scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white')}
                            onClick={() => setScale(0.08)}
                        >
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="canvas-container">
                <MacbookCanvas />
            </div>
        </section>
    )
} // fddf

export default ProductViewer