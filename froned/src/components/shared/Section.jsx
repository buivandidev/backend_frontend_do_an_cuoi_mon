import React from 'react';
import clsx from 'clsx';

export default function Section({ 
  children, 
  className, 
  title, 
  subtitle, 
  dark = false,
  id
}) {
  return (
    <section 
      id={id}
      className={clsx(
        "py-16 md:py-24",
        dark ? "bg-slate-900 text-white" : "bg-transparent",
        className
      )}
    >
      <div className="container-page">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {subtitle && (
              <p className="mono mb-3 text-xs font-bold uppercase tracking-widest text-[var(--brand)]">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className={clsx(
                "text-3xl font-extrabold md:text-5xl",
                dark ? "text-white" : "text-[var(--ink)]"
              )}>
                {title}
              </h2>
            )}
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[var(--brand)] opacity-30"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
