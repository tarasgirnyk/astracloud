/* @ds-bundle: {"format":4,"namespace":"AstraCloudDesignSystem_7d4ce1","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"PricingTable","sourcePath":"components/data/PricingTable.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"ce1659f56775","components/core/Button.jsx":"416a3690ee20","components/core/Card.jsx":"48f4e0aec1fd","components/core/Tag.jsx":"6b5a39ab80a4","components/data/PricingTable.jsx":"4c29c1a0ac14","components/feedback/Accordion.jsx":"8216075f844b","components/feedback/Dialog.jsx":"38d5c1872e25","components/feedback/Tooltip.jsx":"33ea47dce2cd","components/forms/Checkbox.jsx":"cc4f220ce3be","components/forms/Input.jsx":"2a3967658afd","components/forms/Radio.jsx":"37f653f658c3","components/forms/Select.jsx":"e56a01747f5c","components/forms/Switch.jsx":"5f99d80eebd2","components/navigation/Tabs.jsx":"57b2fb91323f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AstraCloudDesignSystem_7d4ce1 = window.AstraCloudDesignSystem_7d4ce1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const tones = {
  orange: {
    background: "rgba(255, 112, 22, 0.12)",
    color: "var(--orange-600)"
  },
  cyan: {
    background: "rgba(62, 230, 216, 0.14)",
    color: "var(--cyan-500)"
  },
  violet: {
    background: "rgba(139, 108, 247, 0.14)",
    color: "var(--violet-500)"
  },
  neutral: {
    background: "var(--gray-100)",
    color: "var(--text-on-light)"
  },
  "on-dark": {
    background: "rgba(255,255,255,0.1)",
    color: "var(--white)"
  }
};
function Badge({
  children,
  tone = "orange",
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 12px",
      borderRadius: "var(--radius-pill)",
      font: "var(--text-caption)",
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizeStyles = {
  sm: {
    padding: "8px 16px",
    font: "600 14px/1 var(--font-body)"
  },
  md: {
    padding: "12px 24px",
    font: "var(--text-button)"
  },
  lg: {
    padding: "16px 32px",
    font: "600 17px/1 var(--font-body)"
  }
};
function variantStyle(variant) {
  switch (variant) {
    case "secondary":
      return {
        background: "var(--white)",
        color: "var(--text-on-light)",
        border: "1px solid var(--border-on-light)"
      };
    case "ghost":
      return {
        background: "transparent",
        color: "var(--text-on-light)",
        border: "1px solid transparent"
      };
    case "ghost-dark":
      return {
        background: "transparent",
        color: "var(--text-on-dark)",
        border: "1px solid var(--border-on-dark)"
      };
    case "dark":
      return {
        background: "var(--navy-950)",
        color: "var(--white)",
        border: "none"
      };
    case "primary":
    default:
      return {
        backgroundImage: "var(--gradient-orange)",
        color: "var(--brand-primary-text)",
        border: "none"
      };
  }
}
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon = null,
  onClick,
  style,
  ...rest
}) {
  const vs = variantStyle(variant);
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      borderRadius: "var(--radius-pill)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "transform var(--duration-fast) var(--ease-standard), filter var(--duration-fast) var(--ease-standard)",
      ...sizeStyles[size],
      ...vs,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.97)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.filter = "none";
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = "brightness(1.06)";
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  tone = "light",
  padding = "32px",
  style
}) {
  const base = tone === "dark" ? {
    background: "var(--surface-card-dark)",
    color: "var(--white)",
    border: "1px solid var(--border-on-dark)"
  } : {
    background: "var(--surface-card)",
    color: "var(--text-on-light)",
    border: "1px solid var(--border-on-light)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      boxShadow: tone === "light" ? "var(--shadow-card)" : "none",
      padding,
      ...base,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  selected = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "8px 16px",
      borderRadius: "var(--radius-md)",
      font: "var(--text-ui-label)",
      cursor: "pointer",
      border: selected ? "1px solid var(--brand-primary)" : "1px solid var(--border-on-light)",
      background: selected ? "rgba(255, 112, 22, 0.08)" : "var(--white)",
      color: selected ? "var(--orange-600)" : "var(--text-on-light)",
      transition: "background var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/PricingTable.jsx
try { (() => {
function PricingTable({
  columns = [],
  rows = [],
  highlightRow = null,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-on-light)",
      overflow: "hidden",
      background: "var(--white)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      font: "var(--text-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--gray-100)"
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("th", {
    key: col.key,
    style: {
      textAlign: "left",
      padding: "16px 20px",
      font: "var(--text-ui-label)",
      color: "var(--text-on-light-muted)",
      whiteSpace: "nowrap"
    }
  }, col.label)), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "16px 20px"
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      background: row.plan === highlightRow ? "rgba(255,112,22,0.06)" : "transparent",
      borderTop: "1px solid var(--border-on-light)"
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("td", {
    key: col.key,
    style: {
      padding: "16px 20px",
      color: "var(--text-on-light)",
      whiteSpace: "nowrap"
    }
  }, col.key === "plan" ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-ui-label)"
    }
  }, row[col.key]) : col.key === "price" ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 17px/1 var(--font-body)",
      color: "var(--text-on-light)"
    }
  }, row[col.key]) : row[col.key])), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 20px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      padding: "8px 20px",
      borderRadius: "var(--radius-pill)",
      border: "none",
      cursor: "pointer",
      font: "600 14px/1 var(--font-body)",
      backgroundImage: "var(--gradient-orange)",
      color: "var(--white)"
    }
  }, "\u0417\u0430\u043C\u043E\u0432\u0438\u0442\u0438"))))))));
}
Object.assign(__ds_scope, { PricingTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PricingTable.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  style
}) {
  const [openIndex, setOpenIndex] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      ...style
    }
  }, items.map((item, i) => {
    const open = openIndex === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        border: "1px solid var(--border-on-light)",
        borderRadius: "var(--radius-md)",
        background: "var(--white)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpenIndex(open ? null : i),
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 20px",
        background: "none",
        border: "none",
        cursor: "pointer",
        font: "var(--text-ui-label)",
        color: "var(--text-on-light)",
        textAlign: "left"
      }
    }, item.question, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "var(--gray-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform var(--duration-standard) var(--ease-standard)",
        flexShrink: 0,
        marginLeft: 12
      }
    }, "+")), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 20px 18px",
        font: "var(--text-body-sm)",
        color: "var(--text-on-light-muted)"
      }
    }, item.answer));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  title,
  children,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(5,7,15,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--white)",
      borderRadius: "var(--radius-lg)",
      padding: "32px",
      maxWidth: 440,
      width: "90%",
      boxShadow: "var(--shadow-popover)",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--text-display-sm)",
      marginBottom: 16
    }
  }, title), children));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--navy-950)",
      color: "var(--white)",
      padding: "6px 12px",
      borderRadius: "var(--radius-sm)",
      font: "var(--text-caption)",
      whiteSpace: "nowrap",
      boxShadow: "var(--shadow-popover)",
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      font: "var(--text-body-sm)",
      color: "var(--text-on-light)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 20,
      height: 20,
      borderRadius: "6px",
      border: checked ? "none" : "1.5px solid var(--border-on-light)",
      background: checked ? "var(--brand-primary)" : "var(--white)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "10",
    viewBox: "0 0 12 10",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 5L4.5 8.5L11 1.5",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      font: "var(--text-body-sm)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-ui-label)",
      color: "var(--text-on-light)"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: {
      padding: "12px 16px",
      borderRadius: "var(--radius-md)",
      border: error ? "1px solid var(--status-danger)" : "1px solid var(--border-on-light)",
      font: "var(--text-body-md)",
      color: "var(--text-on-light)",
      outline: "none",
      background: "var(--white)",
      transition: "border-color var(--duration-fast) var(--ease-standard)"
    },
    onFocus: e => e.currentTarget.style.borderColor = "var(--brand-primary)",
    onBlur: e => e.currentTarget.style.borderColor = error ? "var(--status-danger)" : "var(--border-on-light)"
  }), error && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-danger)",
      font: "var(--text-caption)"
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  name,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      font: "var(--text-body-sm)",
      color: "var(--text-on-light)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(),
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: checked ? "6px solid var(--brand-primary)" : "1.5px solid var(--border-on-light)",
      background: "var(--white)",
      flexShrink: 0,
      transition: "border var(--duration-fast) var(--ease-standard)",
      boxSizing: "border-box"
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selected = options.find(opt => opt.value === value);

  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-ui-label)",
      color: "var(--text-on-light)"
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      padding: "6px 10px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--border-on-light)",
      font: "var(--text-body-sm)",
      color: "var(--text-on-light)",
      background: "var(--white)",
      outline: "none",
      cursor: "pointer",
      transition: "border-color var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: { display: "flex", alignItems: "center", gap: "6px" }
  }, selected && selected.flag && /*#__PURE__*/React.createElement("img", {
    src: selected.flag,
    alt: "",
    style: { width: "18px", height: "13px", objectFit: "cover", borderRadius: "2px" }
  }), selected ? selected.label : ""), /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    style: {
      flexShrink: 0,
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1L5 5L9 1",
    stroke: "var(--text-on-light-muted)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: 0,
      minWidth: "100%",
      zIndex: 100,
      background: "var(--white)",
      border: "1px solid var(--border-on-light)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-popover)",
      padding: "6px",
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, options.map(opt => {
    const isSelected = opt.value === value;
    return /*#__PURE__*/React.createElement("div", {
      key: opt.value,
      onClick: () => {
        onChange && onChange(opt.value);
        setOpen(false);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 10px",
        borderRadius: "var(--radius-md)",
        font: "var(--text-body-sm)",
        color: isSelected ? "var(--brand-primary)" : "var(--text-on-light)",
        background: isSelected ? "rgba(255,112,22,0.08)" : "transparent",
        cursor: "pointer",
        whiteSpace: "nowrap"
      },
      onMouseEnter: e => { if (!isSelected) e.currentTarget.style.background = "var(--gray-100)"; },
      onMouseLeave: e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }
    }, opt.flag && /*#__PURE__*/React.createElement("img", {
      src: opt.flag,
      alt: "",
      style: { width: "18px", height: "13px", objectFit: "cover", borderRadius: "2px" }
    }), opt.label);
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 44,
      height: 26,
      borderRadius: "var(--radius-pill)",
      border: "none",
      padding: 3,
      background: checked ? "var(--brand-primary)" : "var(--gray-300)",
      cursor: "pointer",
      display: "flex",
      justifyContent: checked ? "flex-end" : "flex-start",
      transition: "background var(--duration-standard) var(--ease-standard)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "var(--white)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      transition: "transform var(--duration-standard) var(--ease-standard)"
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "4px",
      background: "var(--gray-100)",
      borderRadius: "var(--radius-pill)",
      padding: "4px",
      width: "fit-content",
      ...style
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    onClick: () => onChange && onChange(t.value),
    style: {
      padding: "10px 20px",
      borderRadius: "var(--radius-pill)",
      border: "none",
      cursor: "pointer",
      font: "var(--text-ui-label)",
      background: active === t.value ? "var(--white)" : "transparent",
      color: active === t.value ? "var(--text-on-light)" : "var(--text-on-light-muted)",
      boxShadow: active === t.value ? "var(--shadow-card)" : "none",
      transition: "all var(--duration-standard) var(--ease-standard)"
    }
  }, t.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.PricingTable = __ds_scope.PricingTable;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
