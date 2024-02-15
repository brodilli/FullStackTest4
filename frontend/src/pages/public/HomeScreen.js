import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../../actions/userActions";
import {
  InboxIcon,
  SparklesIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
const features = [
  "Vitae in pulvinar odio id utobortis in inter.",
  "Sed sed id viverra viverra augue eget massa.",
  "Urna, gravida amet, a, integer venenatis.",
  "Lobortis sed pharetra amet vitae eleifend.",
  "Ullamcorper blandit a consequat donec elit aoreet.",
  "Dolor quo assumenda.",
  "Esse rerum distinctio maiores maiores.",
  "Eos enim officiis ratione.",
  "Tempore molestiae aliquid excepturi.",
  "Perspiciatis eveniet inventore eum et aliquam.",
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = "/login";
  useEffect(() => {
    if (!userInfo && !error) {
      dispatch(getLoginData());
    }
  }, [dispatch, error, userInfo]);
  return (
    <div>
      {/*Hero Section*/}
      {/*crecer altura minima*/}
      <div>
        <div className="relative overflow-hidden bg-[#F5F4F2]">
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 bg-[#F5F4F2] pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
              <svg
                className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  className="bg-[#F5F4F2]"
                  fill="#F5F4F2"
                  points="50,0 100,0 50,100 0,100"
                />
              </svg>

              <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Tu Arte seguro con</span>{" "}
                    <span className="block text-[#E35F21] xl:inline">
                      BlockChain
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                    una forma unica de garantizar Autenticidad y validacion en
                    todas tus obras de arte
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#94A3B8] px-8 py-3 text-base font-medium text-white hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
                      >
                        Empezar ya
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-100 px-8 py-3 text-base font-medium text-stone-900 hover:bg-amber-200 md:py-4 md:px-10 md:text-lg"
                      >
                        ver video
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
              src="https://developer-blogs.nvidia.com/wp-content/uploads/2022/01/AdobeStock_327477069.jpeg"
              alt=""
            />
          </div>
        </div>
        {/* imagen sobrepuesta de iphone con la app clodinary example esta un mockup */}
      </div>
      {/*Section Features */}
      <div className="relative overflow-hidden pt-16 pb-32 bg-[#F5F4F2]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-[#F5F4F2] from-gray-100"
        />
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-[#E35F21] to-amber-400">
                    <InboxIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Stay on top of customer support
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Semper curabitur ullamcorper posuere nunc sed. Ornare
                    iaculis bibendum malesuada faucibus lacinia porttitor.
                    Pulvinar laoreet sagittis viverra duis. In venenatis sem
                    arcu pretium pharetra at. Lectus viverra dui tellus ornare
                    pharetra.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-[#E35F21] to-amber-400 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <blockquote>
                  <div>
                    <p className="text-base text-gray-500">
                      &ldquo;Cras velit quis eros eget rhoncus lacus ultrices
                      sed diam. Sit orci risus aenean curabitur donec aliquet.
                      Mi venenatis in euismod ut.&rdquo;
                    </p>
                  </div>
                  <footer className="mt-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-6 w-6 rounded-full"
                          src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                          alt=""
                        />
                      </div>
                      <div className="text-base font-medium text-gray-700">
                        Marcia Hill, Digital Marketing Manager
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-[#E35F21] to-amber-400">
                    <SparklesIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Better understand your customers
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Semper curabitur ullamcorper posuere nunc sed. Ornare
                    iaculis bibendum malesuada faucibus lacinia porttitor.
                    Pulvinar laoreet sagittis viverra duis. In venenatis sem
                    arcu pretium pharetra at. Lectus viverra dui tellus ornare
                    pharetra.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-[#E35F21] to-amber-400 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
              <div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
                  alt="Customer profile user interface"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Price section*/}
      <div className="bg-[#F5F4F2]">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="pb-16 xl:flex xl:items-center xl:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-gray-900">Everything you need for</span>
                <span className="text-[#E35F21]">$99 a month</span>
              </h1>
              <p className="mt-5 text-xl text-gray-500">
                Includes every feature we offer plus unlimited projects and
                unlimited users.
              </p>
            </div>
            <a
              href="#"
              className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-[#E35F21] to-amber-400 bg-origin-border px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 sm:mt-10 sm:w-auto xl:mt-0"
            >
              Get started today
            </a>
          </div>
          <div className="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
            <div>
              <h2 className="text-lg font-semibold text-[#E35F21]">
                Everything you need
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                All-in-one platform
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
                Malesuada adipiscing sagittis vel nulla nec. Urna, sed a lectus
                elementum blandit et.
              </p>
            </div>
            <div className="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:col-span-2 xl:mt-0">
              <ul role="list" className="divide-y divide-gray-200">
                {features.slice(0, 5).map((feature, featureIdx) =>
                  featureIdx === 0 ? (
                    <li key={feature} className="flex py-4 md:py-0 md:pb-4">
                      <CheckIcon
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base text-gray-500">
                        {feature}
                      </span>
                    </li>
                  ) : (
                    <li key={feature} className="flex py-4">
                      <CheckIcon
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base text-gray-500">
                        {feature}
                      </span>
                    </li>
                  )
                )}
              </ul>
              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-gray-200 md:border-t-0"
              >
                {features.slice(5).map((feature, featureIdx) =>
                  featureIdx === 0 ? (
                    <li
                      key={feature}
                      className="flex py-4 md:border-t-0 md:py-0 md:pb-4"
                    >
                      <CheckIcon
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base text-gray-500">
                        {feature}
                      </span>
                    </li>
                  ) : (
                    <li key={feature} className="flex py-4">
                      <CheckIcon
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base text-gray-500">
                        {feature}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
