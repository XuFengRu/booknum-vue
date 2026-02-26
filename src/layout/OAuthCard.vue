<template>
    <div class="login-page">
        <main class="container">
            <div class="row justify-content-center w-100 g-0">
                <div class="col-xl-10 col-lg-11">
                    <div class="card card-login">
                        <div class="row g-0" style="min-height: 600px;">

                            <div
                                class="col-lg-5 d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5 position-relative dating-bg-animated">

                                <div class="circle-deco" style="width: 200px; height: 200px; top: -50px; left: -50px;">
                                </div>
                                <div class="circle-deco"
                                    style="width: 300px; height: 300px; bottom: -80px; right: -80px;"></div>

                                <slot name="left-side"></slot>
                            </div>

                            <div class="col-lg-7 p-4 p-md-5 bg-body d-flex flex-column justify-content-center">
                                <div class="w-75 mx-auto">
                                    <slot></slot>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
