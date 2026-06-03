"use client";

export default function LiveRateWidget() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* PREMIUM RATE STRIP */}
      <section className="relative z-20 mt-0 md:-mt-28">
        <div className="bg-white rounded-[28px] md:rounded-3xl shadow-2xl border border-[#eadfcc] p-4 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            {["Gold Spot", "Silver Spot", "Gold Futures", "Silver Futures"].map(
              (item) => (
                <div key={item}>
                  <p className="text-[10px] md:text-base uppercase tracking-[2px] md:tracking-[3px] text-[#b08a32]">
                    {item}
                  </p>
                  <h3 className="mt-2 text-xl md:text-3xl font-serif text-[#3D3127]">
                    Live
                  </h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* MARKET TABLE */}
      <section className="bg-white rounded-[28px] md:rounded-[32px] border border-[#eadfcc] p-4 md:p-6 shadow-lg overflow-hidden">
        <div className="mb-5 md:mb-6 text-center">
          <p className="uppercase tracking-[3px] md:tracking-[5px] text-[10px] md:text-xs text-[#b08a32] mb-2">
            Live Market Board
          </p>

          <h2 className="text-3xl md:text-5xl font-serif text-[#3D3127]">
            Today's Market Rates
          </h2>

          <p className="mt-3 text-gray-600 text-xs md:text-sm">
            Real-time international gold and silver prices powered by TradingView
          </p>
        </div>

        <div className="h-[220px] md:h-[260px] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-[#eadfcc]">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/market-quotes/?locale=in#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22260%22%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Precious%20Metals%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22OANDA%3AXAUUSD%22%2C%22displayName%22%3A%22Gold%20Spot%22%7D%2C%7B%22name%22%3A%22OANDA%3AXAGUSD%22%2C%22displayName%22%3A%22Silver%20Spot%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%7D"
            className="h-full w-full"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </section>

      {/* GOLD CHART */}
      <section className="bg-[#1a1410] rounded-[28px] md:rounded-[32px] border border-[#d4af37]/40 p-4 md:p-8 shadow-xl overflow-hidden">
        <div className="mb-5 md:mb-6 text-center">
          <p className="uppercase tracking-[3px] md:tracking-[5px] text-[10px] md:text-xs text-[#d4af37] mb-3">
            Gold Market
          </p>

          <h2 className="text-3xl md:text-5xl font-serif text-white">
            Live Gold Chart
          </h2>
        </div>

        <div className="h-[380px] md:h-[520px] w-full overflow-hidden rounded-2xl md:rounded-3xl bg-white">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=in#%7B%22autosize%22%3Atrue%2C%22symbol%22%3A%22OANDA%3AXAUUSD%22%2C%22interval%22%3A%2230%22%2C%22timezone%22%3A%22Asia%2FKolkata%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22hide_top_toolbar%22%3Atrue%2C%22hide_side_toolbar%22%3Atrue%2C%22allow_symbol_change%22%3Afalse%2C%22save_image%22%3Afalse%7D"
            className="h-full w-full"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </section>

      {/* SILVER CHART */}
      <section className="bg-white rounded-[28px] md:rounded-[32px] border border-[#eadfcc] p-4 md:p-8 shadow-xl overflow-hidden">
        <div className="mb-5 md:mb-6 text-center">
          <p className="uppercase tracking-[3px] md:tracking-[5px] text-[10px] md:text-xs text-[#b08a32] mb-3">
            Silver Market
          </p>

          <h2 className="text-3xl md:text-5xl font-serif text-[#3D3127]">
            Live Silver Chart
          </h2>
        </div>

        <div className="h-[380px] md:h-[520px] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-[#eadfcc]">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=in#%7B%22autosize%22%3Atrue%2C%22symbol%22%3A%22OANDA%3AXAGUSD%22%2C%22interval%22%3A%2230%22%2C%22timezone%22%3A%22Asia%2FKolkata%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22hide_top_toolbar%22%3Atrue%2C%22hide_side_toolbar%22%3Atrue%2C%22allow_symbol_change%22%3Afalse%2C%22save_image%22%3Afalse%7D"
            className="h-full w-full"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </section>
    </div>
  );
}