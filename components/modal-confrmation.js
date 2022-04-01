import PropTypes from 'prop-types';

const ModalConformation = (props) => {
    return (
        <>
            {props.show ?
                <div className='overlay2' onClick={props.onNo}>
                    <div className="dialog2">
                        <div className='container pt-2 pb-1'>
                            <div className="row mb-3">
                                <div className="col">{props.children}</div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col text-end">
                                    <button className='btn btn-primary' onClick={props.onYes} autoFocus={true} onKeyUp={(key) => (key && key.code && key.code === 'Escape') && props.onNo()}>Yes</button>
                                    <button className='btn btn-flat' onClick={props.onNo}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>

    )
}

ModalConformation.propTypes = {
    show: PropTypes.bool.isRequired,
    onNo: PropTypes.func.isRequired,
    onYes: PropTypes.func.isRequired,
}

export default ModalConformation;